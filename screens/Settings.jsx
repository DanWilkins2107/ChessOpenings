import { StyleSheet, Text } from "react-native";
import Title from "../components/text/Title";
import Container from "../components/containers/Container";
import Card from "../components/containers/Card";
import Subheading from "../components/text/Subheading";
import SecondaryButton from "../components/genericButtons/SecondaryButton";
import { auth } from "../firebase";

export default function Settings() {
    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container theme="light" style={styles.container}>
            <Title style={styles.title}>Settings</Title>
            <Card>
                <Subheading>Training Settings</Subheading>
            </Card>
            <Card>
                <Subheading>Membership</Subheading>
            </Card>
            <Card>
                <Subheading>Account Details</Subheading>
                <Text>ADD MORE HERE</Text>
                <SecondaryButton
                    text="Sign Out"
                    icon="arrow-right-from-bracket"
                    onPress={handleSignOut}
                />
            </Card>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flex: 1,
    },
    title: {
        marginBottom: 20,
    },
});
