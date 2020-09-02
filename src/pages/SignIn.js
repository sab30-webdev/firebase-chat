import React from "react";
import firebase from "firebase/app";
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from "rsuite";
import { auth, database } from "../misc/firebase";

const SignIn = () => {
  const onGoogleSignIn = async () => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      if (additionalUserInfo.isNewUser) {
        await database.ref(`profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success("Signed in", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>

              <div className="mt-3">
                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
