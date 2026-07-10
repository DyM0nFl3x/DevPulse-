export type IIssueType = "bug" | "feature_request";
export interface IIssue {
  title: string;
  description: string;
  type: IIssueType;
}

export type IIssueStatus = "open" | "in_progress" | "resolved";
export interface IAllIssue {
  sort?: "newest" | "oldest";
  type?: IIssueType;
  status?: IIssueStatus;
}

