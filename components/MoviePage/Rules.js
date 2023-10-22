import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const parseRulesRichText = (richTextHtml) => {
  // 1. From the first <ul> tag in movie.RulesHtml, extract the contents of all <li> tags into an array of strings
  const firstUlMatch = richTextHtml.match(/<ul>[\s\S]*?<\/ul>/);
  let rules = [];

  if (firstUlMatch) {
    const ulContent = firstUlMatch[0];
    rules = ulContent
      .match(/<li>(.*?)<\/li>/g)
      .map((item) => item.replace(/<\/?li>/g, ""));
  }

  // 2. Remove the first <ul> tag in movie.RulesHtml and store the modified string
  const extraContent = richTextHtml.replace(firstUlMatch[0], "");

  return {
    rules,
    extraContent,
  };
};

const Rules = ({ movie }) => {
  let ruleContents = parseRulesRichText(movie.RulesHtml);
  return (
    <>
      <Flex direction='column'>
        <Text>Drink Whenever...</Text>
        {ruleContents.rules.map((m, index) => (
          <Flex key={`rule-${index}`} bg='dark.600' p={4} mb={2} rounded='xl'>
            <Text>{m}</Text>
          </Flex>
        ))}
      </Flex>

      {extraContent && (
        <Flex direction='column' w='full'>
          <div
            dangerouslySetInnerHTML={{ __html: ruleContents.extraContent }}
            className='markdown'
          />
        </Flex>
      )}
    </>
  );
};

export default Rules;
