import { ScrollView, StyleSheet } from "react-native";
import Container from "../components/Container";
import Card from "../components/containers/Card";
import Title from "../components/text/Title";
import Subheading from "../components/text/Subheading";
import ObjectiveButton from "../components/dashboard/ObjectiveButton";
import MainButton from "../components/dashboard/MainButton";
import Body from "../components/text/Body";
import SocialsButton from "../components/dashboard/SocialsButton";

export default function Dashboard() {
    return (
        <Container theme="light">
            <ScrollView style={styles.container}>
                <Title style={styles.title}>Hi __________</Title>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Get Started</Subheading>
                    <ObjectiveButton style={styles.button} text="Create a Study" completed />
                    <ObjectiveButton style={styles.button} text="Complete a Daily Test" active />
                    <ObjectiveButton style={styles.button} text="Train a Study" />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Welcome Back</Subheading>
                    <Body style={styles.body}>
                        The last study you trained was ______. Want to pick up where you left off?
                    </Body>
                    <MainButton text="Continue Training" />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Current Plan: Free</Subheading>
                    <Body style={styles.body}>
                        Thanks for helping on the Beta Testing of Chess Opening Trainer {"<"}3
                    </Body>
                    <MainButton text="Upgrade Plan" />
                </Card>
                <Card style={styles.card}>
                    <Subheading style={styles.subheading}>Join the Community</Subheading>
                    <SocialsButton style={styles.socialButton} text="Instagram" icon="instagram" />
                    <SocialsButton style={styles.socialButton} text="Tiktok" icon="tiktok" />
                    <SocialsButton style={styles.button} text="Discord" icon="discord" />
                </Card>
                <Card style={styles.card}>
                    <Subheading>Rate Us</Subheading>
                </Card>
            </ScrollView>
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
    card: {
        marginBottom: 20,
    },
    subheading: {
        marginBottom: 10,
    },
    button: {
        marginBottom: 5,
    },
    socialButton: {
        marginBottom: 10,
    },
    body: {
        marginBottom: 10,
    },
});
