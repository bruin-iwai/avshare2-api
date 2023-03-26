export interface IndexFileSchema {
  file: string;
  title: string;
}

export interface IndexSchema {
  title: string;
  files: IndexFileSchema[];
}
