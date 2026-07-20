import PageBackground from "@/components/ui/PageBackground";
import { LoadingState } from "@/components/ui";

const loading = () => {
  return (
    <PageBackground>
      <div className="w-full min-h-screen flex justify-center items-center">
        <LoadingState />
      </div>
    </PageBackground>
  );
};

export default loading;
