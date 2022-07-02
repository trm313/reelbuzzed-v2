import Link from "next/link";
import {
  Flex,
  Text,
  IconButton,
  Button,
  Alert,
  AlertIcon,
  Icon,
} from "@chakra-ui/react";
import { IoDocumentTextOutline } from "react-icons/io5";

const Disclaimer = () => (
  <Link href='/user-agreements'>
    <Button
      leftIcon={<Icon as={IoDocumentTextOutline} />}
      my={2}
      w={["full", "lg"]}
      border='1px'
      borderColor={"gray.200"}
      alignSelf='center'
    >
      {`Always Drink Responsibly`.toUpperCase()}
    </Button>
  </Link>
);

// const Disclaimer = () => (
//   <Alert colorScheme='purple' mt={4}>
//     <AlertIcon status='success' />
//     Always drink responsibly!
//     <Link href='/user-agreements'>
//       <IconButton
//         aria-label='User Agreements'
//         ml={4}
//         icon={<Icon as={IoDocumentTextOutline} />}
//       />
//     </Link>
//   </Alert>
// );

export default Disclaimer;
