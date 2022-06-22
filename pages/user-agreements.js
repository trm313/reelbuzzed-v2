import { Flex, Text, Container } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout/Layout";

import { userAgreementsMarkdown } from "../content/userAgreementsMarkdown";

const UserAgreements = () => {
  let markdown = `# Test\n Testing testing\n- bullet1\n- bullet2`;
  return (
    <Layout>
      <Container maxW='4xl' mb={12}>
        <ReactMarkdown className='markdown'>
          {userAgreementsMarkdown}
        </ReactMarkdown>
      </Container>
    </Layout>
  );
};

export default UserAgreements;
