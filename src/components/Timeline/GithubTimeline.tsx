import { For, createSignal } from "solid-js";
import { GITHUB_USERNAME } from "../../lib/constants";
import type { GithubEvent } from "../../types/githubEvent";

export default function GitHubTimeline({
  events,
}: {
  events: Record<string, GithubEvent[]>;
}) {
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const allEvents = Object.keys(events).map((date) => events[date]);
  const allDatesEvent = Object.keys(events);
  const eventsGroupSelected = () => allEvents[selectedIndex()];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-EN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div class="w-full">
      <div class="text-nowrap overflow-auto scrollbar-hide">
        <div class="flex justify-between">
          <For each={allDatesEvent}>
            {(event, index) => (
              <button
                class={`py-1 px-2 text-sm font-light ${
                  index() === selectedIndex()
                    ? "text-primary-500 font-medium border-primary-500 border-b-2 opacity-100"
                    : ""
                }`}
                onClick={() => setSelectedIndex(index())}
              >
                {formatDate(event)}
              </button>
            )}
          </For>
        </div>
      </div>
      <div class="max-h-20 h-72 pb-5 overflow-auto scrollbar-tiny">
        <ul>
          <For each={eventsGroupSelected()}>
            {(event) => (
              <li class="pr-2 ">
                <div class="p-3 text-white text-sm font-light">
                  <span>
                    <a
                      href={cleanRepoUrl(event.repo?.url)}
                      target="_blank"
                      class="underline capitalize"
                    >
                      {stripRepoOwner(event.repo?.name)}
                    </a>
                  </span>{" "}
                  - <b> {getEventTitle(event)}</b>
                  <p>{event.payload.commits?.[0]?.message}</p>
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}
function stripRepoOwner(repoName: string) {
  return repoName.replace(`${GITHUB_USERNAME}/`, "");
}
function cleanRepoUrl(repoUrl: string): string {
  return repoUrl.replace("https://api.", "https://").replace("/repos", "");
}
const getEventTitle = (event: GithubEvent): string => {
  switch (event.type) {
    case "PushEvent":
      return "Commit";
    case "CreateEvent":
      return "Created repository/branch";
    case "DeleteEvent":
      return "Deleted repository/branch";
    case "ForkEvent":
      return `Forked ${event.repo.name}`;
    case "GollumEvent":
      return "Updated Wiki";
    case "IssueCommentEvent":
      return "Commented on an issue";
    case "IssuesEvent":
      return `${event.payload.action} an issue`;
    case "MemberEvent":
      return "Changed membership";
    case "PublicEvent":
      return "Made repository public";
    case "PullRequestEvent":
      return `${event.payload.action} a pull request`;
    case "PullRequestReviewEvent":
      return "Reviewed a pull request";
    case "PullRequestReviewCommentEvent":
      return "Commented on a pull request review";
    case "PullRequestReviewThreadEvent":
      return "Reviewed a pull request thread";
    case "ReleaseEvent":
      return `${event.payload.action} a release`;
    case "SponsorshipEvent":
      return "Sponsorship event";
    case "WatchEvent":
      return "Starred a repository";
    default:
      return event.type;
  }
};
