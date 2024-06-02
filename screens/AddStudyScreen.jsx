import { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Container from "../components/Container";
import Header from '../components/Header';
import AddStudyButton from '../components/addstudy/AddStudyButton';
import OrSeparator from '../components/auth/OrSeparator';
import PgnInput from '../components/addstudy/PgnInput';
import UrlButton from '../components/addstudy/UrlButton';

const AddStudyScreen = () => {
  const [pgnText, setPgnText] = useState("");
  const [lichessStudyUrl, setLichessStudyUrl] = useState("");

  return (
    <Container>
      <KeyboardAvoidingView style={styles.container}>
        <Header showBackButton />
        <ScrollView style={styles.scrollView}>
          <AddStudyButton title="Create From Scratch" onPress={() => console.log("Create From Scratch")} colors={['#2196F3', '#1976D2']} textColor="#fff" />
          <OrSeparator />
          <PgnInput pgnText={pgnText} setPgnText={setPgnText} />
          <AddStudyButton title="Import PGN" onPress={() => console.log("Import PGN")} colors={['#2196F3', '#1976D2']} textColor="#fff" />
          <OrSeparator />
          <UrlButton url={lichessStudyUrl} setUrl={setLichessStudyUrl} placeholder="Enter Lichess Study URL" title="Import Lichess Study" onPress={() => console.log("Import Lichess Study")} colors={['#fff', '#ddd']} textColor="#000" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollView: {
    flex: 1,
  },
});

export default AddStudyScreen;