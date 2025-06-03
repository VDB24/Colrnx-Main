// File content is too long to include here, but the key changes needed are:

1. In the handleJoinGroup function, after successfully joining:

```typescript
const handleJoinGroup = async (groupId: string) => {
  try {
    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from('study_group_members')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', user?.id)
      .single();

    if (existingMember) {
      console.warn('User is already a member of this group');
      return;
    }

    // Get group details
    const { data: groupData } = await supabase
      .from('study_groups')
      .select('*, profiles:leader_id(name)')
      .eq('id', groupId)
      .single();

    // Join the group
    const { error } = await supabase
      .from('study_group_members')
      .insert([
        {
          group_id: groupId,
          user_id: user?.id,
          role: 'member'
        }
      ]);

    if (error) {
      // Check if error is due to unique constraint violation
      if (error.code === '23505') {
        console.warn('User is already a member of this group');
        return;
      }
      throw error;
    }

    // Create notification for group leader
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-notification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: groupData.leader_id,
        title: 'New Group Member',
        content: `${user?.user_metadata?.name || 'A user'} has joined your study group "${groupData.title}"`,
        type: 'info'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create notification');
    }

    await loadMembers();
    await loadStudyGroups(); // Reload groups to update the UI
  } catch (error) {
    console.error('Error joining group:', error);
  }
};
```