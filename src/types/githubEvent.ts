export interface GithubEventBase {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
  org?: {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
}

export interface CommitCommentPayload {
  action: string;
  comment: unknown;
}

export interface CreateEventPayload {
  ref: string | null;
  ref_type: "branch" | "tag" | "repository";
  master_branch: string;
  description: string | null;
  pusher_type: "user" | "deploy key";
}

export interface DeleteEventPayload {
  ref: string;
  ref_type: "branch" | "tag";
}

export interface ForkEventPayload {
  forkee: unknown; // Puoi estendere con i campi specifici del repository forkato
}

export interface GollumEventPayload {
  pages: Array<{
    page_name: string;
    title: string;
    action: "created" | "edited";
    sha: string;
    html_url: string;
  }>;
}

export interface IssueCommentEventPayload {
  action: string; // "created", "edited" o "deleted"
  changes?: {
    body: { from: string };
  };
  issue: any;
  comment: any;
}

export interface IssuesEventPayload {
  action: string; // "opened", "edited", "closed", "reopened", "assigned", etc.
  issue: any;
  changes?: {
    title?: { from: string };
    body?: { from: string };
  };
  assignee?: any;
  label?: any;
}

export interface MemberEventPayload {
  action: string; // E.g. "added"
  member: any;
  changes?: {
    old_permission?: { from: string };
  };
}

export interface PublicEventPayload {} // Payload vuoto

export interface PullRequestEventPayload {
  action: string; // E.g. "opened", "closed", "reopened", etc.
  number: number;
  changes?: {
    title?: { from: string };
    body?: { from: string };
  };
  pull_request: any;
  reason?: string;
}

export interface PullRequestReviewEventPayload {
  action: string; // E.g. "created"
  pull_request: any;
  review: any;
}

export interface PullRequestReviewCommentEventPayload {
  action: string; // E.g. "created"
  changes?: {
    body: { from: string };
  };
  pull_request: any;
  comment: any;
}

export interface PullRequestReviewThreadEventPayload {
  action: "resolved" | "unresolved";
  pull_request: any;
  thread: any;
}

export interface PushEventPayload {
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string; // Es. "refs/heads/main"
  head: string;
  before: string;
  commits: Array<{
    sha: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
    distinct: boolean;
    url: string;
  }>;
}

export interface ReleaseEventPayload {
  action: string; // Es. "published"
  changes?: {
    body?: { from: string };
    name?: { from: string };
  };
  release: any;
}

export interface SponsorshipEventPayload {
  action: string; // Es. "created"
  effective_date?: string;
  changes?: {
    tier?: { from: any };
    privacy_level?: { from: string };
  };
}

export interface WatchEventPayload {
  action: "started"; // L'unica azione disponibile
}

// Union type che raggruppa tutti i tipi di evento

export type GithubEvent =
  | (GithubEventBase & {
      type: "CommitCommentEvent";
      payload: CommitCommentPayload;
    })
  | (GithubEventBase & { type: "CreateEvent"; payload: CreateEventPayload })
  | (GithubEventBase & { type: "DeleteEvent"; payload: DeleteEventPayload })
  | (GithubEventBase & { type: "ForkEvent"; payload: ForkEventPayload })
  | (GithubEventBase & { type: "GollumEvent"; payload: GollumEventPayload })
  | (GithubEventBase & {
      type: "IssueCommentEvent";
      payload: IssueCommentEventPayload;
    })
  | (GithubEventBase & { type: "IssuesEvent"; payload: IssuesEventPayload })
  | (GithubEventBase & { type: "MemberEvent"; payload: MemberEventPayload })
  | (GithubEventBase & { type: "PublicEvent"; payload: PublicEventPayload })
  | (GithubEventBase & {
      type: "PullRequestEvent";
      payload: PullRequestEventPayload;
    })
  | (GithubEventBase & {
      type: "PullRequestReviewEvent";
      payload: PullRequestReviewEventPayload;
    })
  | (GithubEventBase & {
      type: "PullRequestReviewCommentEvent";
      payload: PullRequestReviewCommentEventPayload;
    })
  | (GithubEventBase & {
      type: "PullRequestReviewThreadEvent";
      payload: PullRequestReviewThreadEventPayload;
    })
  | (GithubEventBase & { type: "PushEvent"; payload: PushEventPayload })
  | (GithubEventBase & { type: "ReleaseEvent"; payload: ReleaseEventPayload })
  | (GithubEventBase & {
      type: "SponsorshipEvent";
      payload: SponsorshipEventPayload;
    })
  | (GithubEventBase & { type: "WatchEvent"; payload: WatchEventPayload });
