export interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  createdTs: Date;
  updatedTs: Date;
}

export type NewIdea = Omit<Idea, 'id' | 'createdTs' | 'updatedTs'>;
