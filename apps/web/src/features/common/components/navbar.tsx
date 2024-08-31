'use client'

import { Toolbar, ToolbarButton } from '@saas-ui-pro/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import ConnectButton from './connectbtn'

export function NavBar() {
  return (
    <Toolbar className="overview-toolbar" variant="ghost">
      <ToolbarButton
        as="a"
        href="https://x.com/oleprotocol"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/dajkatal/ole-protocol"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton as="a" href="" icon={<FaDiscord />} label="Join Discord" />

      <ConnectButton />
    </Toolbar>
  )
}

export default NavBar
