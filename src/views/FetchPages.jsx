"use client";

import { GraphQLClient, gql } from 'graphql-request';
import { endpointURL } from '../ThemeModule';

const graphQLClient = new GraphQLClient(endpointURL);

const GET_PAGES = gql`
  query GetPages {
    page(where: {}) {
        stage
        title
        slug
        metaTitle
        metaDescription
    }
  }
`;

export const FetchPages = async () => {
    try {
        const data = await graphQLClient.request(GET_PAGES);
        console.log(data.pages)
        return data.pages;

      } catch (error) {
        console.error("Error fetching pages:", error);
        return [];
      }
};
