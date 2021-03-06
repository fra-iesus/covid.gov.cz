import React from 'react';
import { graphql } from 'gatsby';
import { IQuery } from 'graphql-types';
import Container from '@/components/container';
import Headline from '@/components/headline';
import ListCard from '@/components/list-card';
import Layout from '@/layouts/default-layout';
import Breadcrumb from '@/components/breadcrumb';
import I18n from '@/components/i18n';

interface IProps {
  data: IQuery;
}

const Home: React.FC<IProps> = ({ data }) => {
  const { taxonomyTermMeasureType } = data;
  return (
    <Layout>
      <Container>
        <div className="pt-1">
          <Breadcrumb
            items={[
              { title: I18n('home'), url: '/' },
              { title: I18n('current_measures'), url: I18n('slug_measures') },
              taxonomyTermMeasureType.name,
            ]}
            variant="inverse"
          />
        </div>
        <div className="mt-3">
          <Headline>{taxonomyTermMeasureType.name}</Headline>
        </div>
        <div>
          {taxonomyTermMeasureType.relationships?.measure?.map(
            ({ id, title, norm, path }) => {
              return (
                <ListCard
                  title={title}
                  description={norm}
                  key={`taxonomyTermMeasureType-list-item-${id}`}
                  link={path?.alias}
                />
              );
            },
          )}
        </div>
      </Container>
    </Layout>
  );
};
export default Home;

export const query = graphql`
  query($slug: String!) {
    taxonomyTermMeasureType(path: { alias: { eq: $slug } }) {
      name
      relationships {
        measure {
          id
          title
          norm
          path {
            alias
          }
        }
      }
    }
  }
`;
