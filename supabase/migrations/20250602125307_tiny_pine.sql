-- Add delete policy for study groups
CREATE POLICY "Group leaders can delete their groups"
  ON study_groups FOR DELETE
  USING (auth.uid() = leader_id);