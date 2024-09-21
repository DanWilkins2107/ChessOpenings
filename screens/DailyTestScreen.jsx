import { useEffect } from "react";
import Container from "../components/Container";
import { Text, View } from "react-native";
import getDataForTraining from "../functions/fetch/setUpTraining";

const DailyTestScreen = ({ navigation }) => {
    const testArray = [];
    useEffect(() => {
        const initialize = async () => {
            try {
                const {
                    selectedBranchArray,
                    finishedBranchArray,
                    unselectedBranchArray,
                    splitArray,
                    _mistakeNodeArray,
                    treeArray,
                } = await getDataForTraining(null);

                const branchArray = selectedBranchArray
                    .concat(unselectedBranchArray)
                    .concat(finishedBranchArray);

                console.log(branchArray.length);
                console.log(splitArray.length);


            } catch (error) {
                console.log(error);
            }
        };
        initialize();
    });
    return (
        <Container>
            <View>
                <Text>DailyTestScreen</Text>
            </View>
        </Container>
    );
};

export default DailyTestScreen;
