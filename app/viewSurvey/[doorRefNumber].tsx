// // app/viewSurvey/[doorRefNumber].tsx
// import { useLocalSearchParams } from 'expo-router';
// import ViewSurvey from '../../src/screens/ViewSurvey'; // Adjust path if needed

// export default function ViewSurveyPage() {
//   const { doorRefNumber } = useLocalSearchParams();

//   return <ViewSurvey doorRefNumber={doorRefNumber as string} currentURL={''} userObj={undefined} />;
// }
// import { useLocalSearchParams } from 'expo-router';
// import { useLocalSearchParams } from 'expo-router';
// import { useSelector } from 'react-redux';
// import ViewSurvey from '../../src/screens/ViewSurvey';
// import { RootState } from '../../src/store/slices/store';

// export default function ViewSurveyPage() {
//   const { doorRefNumber } = useLocalSearchParams();

//   const userObj = useSelector((state: RootState) => state.user.userObj);

//   console.log("🔍 userObj from Redux:", userObj);

//   return (
//     <ViewSurvey
//       doorRefNumber={doorRefNumber as string}
//       currentURL={'viewSurvey'}
//       userObj={userObj?.user || null}
//     />
//   );
// }

import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import ViewSurvey from '../../src/screens/ViewSurvey';
import { RootState } from '../../src/store/slices/store';

export default function ViewSurveyPage() {
  const { doorRefNumber } = useLocalSearchParams();

  const userObj = useSelector((state: RootState) => state.user.userObj);

  console.log("🔍 userObj from Redux:", userObj);

  return (
    <ViewSurvey
      doorRefNumber={doorRefNumber as string}
      currentURL="viewSurvey"
      userObj={userObj || null}
    />
  );
}
