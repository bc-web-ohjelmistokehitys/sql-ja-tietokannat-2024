import { FC, ReactNode, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  const client = useRef(new QueryClient());

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        console.log(error);

        return (
          <div>Something went terribly wrong. Please refresh the page.</div>
        );
      }}
    >
      <QueryClientProvider client={client.current}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default Providers;
