import { For, createSignal } from 'solid-js';
import type { GithubEvent } from "./GithubEvents.types";


export default function GitHubTimeline({ events }: { events: Record<string, GithubEvent[]> }) {
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const allEvents = Object.keys(events).map((date) => events[date]);
  const allDatesEvent = Object.keys(events);
  const eventsGroupSelected = () => allEvents[selectedIndex()];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'short',

    });
  };

  const getEventTitle = (event: GithubEvent): string => {
    switch (event.type) {
      case "PushEvent":
        return event.payload.commits?.[0]?.message || "Commit";
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
  return (
    <div class="w-full">
      <div class="timeline-dates overflow-auto scrollbar-hide">
        <div class="flex justify-between">
          <For each={allDatesEvent}>
            {(event, index) => (
              <button
                class={`py-2 px-3 ${index() === selectedIndex() ? "text-primary-500 border-primary-500 border-b-2 opacity-100" : ""
                  }`}
                onClick={() => setSelectedIndex(index())}
              >
                {formatDate(event)}
              </button>
            )}
          </For>
        </div>
      </div>
      <div class='max-h-20 pb-5 overflow-auto scrollbar-tiny'>
        <For each={eventsGroupSelected()}>
          {(event) => (
            <ul >
              <li>

                <div class="p-3 text-white">
                  <h2 class="mb-2">{getEventTitle(event)}</h2>
                  <p>
                    Repository:
                    <a href={allDatesEvent[selectedIndex()]} target="_blank" class="underline">
                      {event.repo?.name}
                    </a>
                    {event.payload?.commits?.[0]?.message && (
                      <> - {event.payload.commits?.[0]?.message}</>
                    )}
                  </p>

                </div>
              </li>
            </ul>
          )}
        </For>
      </div>
    </div>
  );
}