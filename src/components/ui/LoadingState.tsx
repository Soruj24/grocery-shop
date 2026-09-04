import { LoadingState as SystemLoadingState } from "./system/Spinner";

/**
 * @deprecated Import `LoadingState` from `@/components/ui` instead.
 *
 * Backward-compatible wrapper: the legacy `message` prop maps to the
 * system `label` prop. No LanguageContext dependency.
 */
export default function LoadingState({ message, label }: { message?: string; label?: string }) {
  return <SystemLoadingState label={label ?? message} />;
}
