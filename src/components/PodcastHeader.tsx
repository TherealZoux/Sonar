import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PodcastHeader({ path = "", name = "" }) {
  const segments = path.split('/').filter(Boolean).filter(seg => seg.toLowerCase() !== 'podcast');
  const formatSegment = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.length > 0 && <BreadcrumbSeparator />}

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const displayText = (isLast && name) ? name : formatSegment(segment);
          const isClickable = segment.toLowerCase() !== 'podcast';
          return (
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayText}</BreadcrumbPage>
                ) : isClickable ? (
                  <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
                ) : (
                  <span className="text-gray-500 transition-colors hover:text-gray-900">
                    {displayText}
                  </span>
                )}
              </BreadcrumbItem>

          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
