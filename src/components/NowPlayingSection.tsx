export interface NowPlayingSectionProps {
  title: string;
}

const NowPlayingSection: React.FC<NowPlayingSectionProps> = ({ title }) => {
  return (
    <div className="sm:hidden bg-zinc-900 pt-[15px] pb-[23px] px-[15px] mb-6">
      <div className="font-proximaNovaCondExtrabld text-[15px] tracking-[1.5px] text-intuit">
        NOW PLAYING
      </div>
      <div className="mt-1.5 font-proximaNovaCondBld font-bold text-[22px] leading-6 tracking-[0.5px] text-white">
        {title}
      </div>
    </div>
  );
};

export default NowPlayingSection;
