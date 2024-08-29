import { PublicLayout } from '@app/features/common/layouts/public-layout'

export default function MarketingLayout(props: { children: React.ReactNode }) {
  return <PublicLayout>{props.children}</PublicLayout>
}
