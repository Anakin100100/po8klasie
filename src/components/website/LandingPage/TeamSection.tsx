import { FC, forwardRef, HTMLProps } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import { IconType } from 'react-icons';
import { FaGithub, FaGlobe, FaLinkedinIn } from 'react-icons/fa';
import teamMembers, { TeamMember } from '../data/team';

const IMAGE_SIZE = 150;

const iconMapping: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  website: FaGlobe,
};

const SocialLink = forwardRef<
  HTMLAnchorElement,
  { link: [string, string] } & HTMLProps<HTMLAnchorElement>
>(({ link: [type, url], ...anchorProps }, ref) => {
  const Icon = iconMapping[type];
  return (
    <a href={url} ref={ref} {...anchorProps}>
      <Icon />
    </a>
  );
});

const TeamMemberCard: FC<{ teamMember: TeamMember; alignToRight?: boolean }> = ({
  teamMember: { image, imagePlaceholder, name, roles, links },
}) => (
  <div className="flex justify-center">
    <div className="flex flex-col justify-between" style={{ width: IMAGE_SIZE + 50 }}>
      <div>
        <div>
          <ProgressiveImage src={image} placeholder={imagePlaceholder}>
            {(src: string) => (
              <img
                src={src}
                alt={name}
                className="object-cover rounded"
                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              />
            )}
          </ProgressiveImage>
        </div>
        <span className="block text-lg font-bold mt-1">{name}</span>
        <span className="block uppercase text-md mt-1">
          {roles.map((role) => (
            <span key={role} className="block">
              {role}
            </span>
          ))}
        </span>
      </div>
      <div className="flex mt-2">
        {links.map((link) => (
          <div key={link[1]} className="mx-2 first:ml-0 text-lg">
            <SocialLink link={link} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TeamSection: FC = () => (
  <div className="mt-32">
    <div className="w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold">Wolontariusze, którzy tworzą ten projekt</h2>
      <div className="mt-20 grid gap-x-20 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((teamMember) => (
          <TeamMemberCard key={teamMember.name} teamMember={teamMember} />
        ))}
      </div>
    </div>
  </div>
);

export default TeamSection;
