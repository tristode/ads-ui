import { DiscordInvite } from "@skyra/discord-components-react";

export default function Invite({
  link,
  title,
  icon,
  preamble,
  notice,
}: {
  link: string;
  title: string;
  icon: string;
  preamble?: string;
  notice?: string;
}) {
  return (
    <div className="p-4 flex flex-col gap-1 items-start justify-center">
      {preamble && <p className="text-sm text-gray-400">{preamble}</p>}
      <DiscordInvite
        name={title}
        icon={icon}
        url={link}
        online={8}
        members={46}
        verified={true}
      />
      {notice && <p className="text-sm text-gray-400">{notice}</p>}
    </div>
  );
}
