// app/viewSurvey/[doorRefNumber].tsx
import { useLocalSearchParams } from 'expo-router';
import ViewSurvey from '../../src/screens/ViewSurvey'; // Adjust path if needed

export default function ViewSurveyPage() {
  const { doorRefNumber } = useLocalSearchParams();

  return <ViewSurvey doorRefNumber={doorRefNumber as string} />;
}
