import React, { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withProjectConfig, ProjectConfigConsumerProps } from '../../config/withProjectConfig';
import { getProjectConfigProps } from '../../config/nextHelpers';
import AppLayout from '../../components/app/AppLayout';
import SearchView from '../../components/app/SearchPage/SearchView';
import { ProjectConfig } from '../../config/types';
import { NextSeo } from 'next-seo';

type SchoolPageProps = ProjectConfigConsumerProps<'appearance' | 'searchView'>;

interface SearchPageParams extends ParsedUrlQuery {
  projectID: string;
}

const SearchPage: FC<SchoolPageProps> = ({ PROJECT: { appearance } }) => {
  return (
    <AppLayout projectAppearance={appearance} wideNavbar noFooter>
      <NextSeo title={appearance.appName} />
      <SearchView />
    </AppLayout>
  );
};

export default withProjectConfig<SchoolPageProps>(SearchPage);

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SearchPageParams>,
): Promise<GetServerSidePropsResult<{ PROJECT: Partial<ProjectConfig> }>> => {
  const projectID = context?.params?.projectID;

  if (!projectID)
    return {
      notFound: true,
    };

  return {
    props: {
      PROJECT: await getProjectConfigProps(['appearance', 'searchView'], projectID),
    },
  };
};

// https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
// A page that relies on publicRuntimeConfig must use getInitialProps to opt-out of Automatic Static Optimization.
// Runtime configuration won't be available to any page (or component in a page) without getInitialProps.
export const getInitialProps = (): void => {};
