import { gql } from "@apollo/client";

// This is a robust query designed to pull content based on the Service slug.
// You will need to adapt the 'pageBy' or custom post type structure to match your exact WordPress setup.

export const GET_SERVICE_CONTENT = gql`
  query GetServiceContent($serviceSlug: String!) {
    # Replace 'pageBy' with your custom post type if needed (e.g., 'serviceBy' or 'postBy')
    pageBy(uri: $serviceSlug) {
      id
      title
      content
      seo {
        title
        metaDesc
      }
      # If using ACF, it would look something like this:
      # serviceDetails {
      #   faqs {
      #     question
      #     answer
      #   }
      #   pricing
      # }
    }
  }
`;