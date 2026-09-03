import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { HelpCircle } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const isValidIcon = name in dynamicIconImports;

  if (!isValidIcon) {
    return <HelpCircle {...props} />;
  }

  const validName = name as keyof typeof dynamicIconImports;
  const LucideIcon = lazy(dynamicIconImports[validName]);

  return (
    <Suspense fallback={<HelpCircle {...props} className="opacity-0" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default DynamicIcon;
