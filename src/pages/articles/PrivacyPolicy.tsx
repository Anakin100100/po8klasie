import React, { FC } from 'react';
import ArticleLayout from '../../components/ArticleLayout';
import { useBasicPageViewTracker } from '../../utils/analytics';

const PrivacyPolicyPage: FC = () => {
  useBasicPageViewTracker();
  return (
    <ArticleLayout title="Polityka prywatności">
      <p>Strona w budowie</p>
    </ArticleLayout>
  );
};

export default PrivacyPolicyPage;
