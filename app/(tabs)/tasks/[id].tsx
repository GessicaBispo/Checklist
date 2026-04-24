import { Redirect, useLocalSearchParams } from 'expo-router';

export default function LegacyTaskRedirect() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const taskId = Array.isArray(id) ? id[0] : id;

  if (!taskId) {
    return <Redirect href="/(tabs)/Tasks" />;
  }

  return (
    <Redirect
      href={{
        pathname: '/tasks/[id]',
        params: { id: taskId },
      }}
    />
  );
}
