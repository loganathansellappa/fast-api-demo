import { z } from "zod";

export const MissionControlSchema =  z.object({
  title: z.string(),
  description: z.string(),
  mission_state: z.string(),
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})
export const NormalizedMissionControlSchema = z.array(MissionControlSchema);


export type MissionControlSchema = z.infer<typeof MissionControlSchema>;
