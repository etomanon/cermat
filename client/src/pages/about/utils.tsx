import React from 'react'
import StorageIcon from '@material-ui/icons/Storage'
import { AboutItemType } from './about-item'
import PermMediaIcon from '@material-ui/icons/PermMedia'
import { ControlLink } from '@/components/control/control-link'
import { Typography } from '@material-ui/core'
import ContactMailIcon from '@material-ui/icons/ContactMail'

export const ABOUT_ITEMS: AboutItemType[] = [
  {
    Icon: <ContactMailIcon color="secondary" />,
    title: 'Kontakt',
    description: (
      <Typography>
        V případě dotazů, hlášení chyb apod. nás kontaktujte na&nbsp;
        <ControlLink url="mailto:maturoid.contact@gmail.com">
          maturoid.contact@gmail.com
        </ControlLink>
        .
      </Typography>
    ),
  },
  {
    Icon: <StorageIcon color="secondary" />,
    title: 'Data',
    description: (
      <Typography>
        Data o maturitních výsledcích jsou brána z&nbsp;
        <ControlLink url="https://vysledky.cermat.cz/data/Default.aspx">
          CERMATu
        </ControlLink>
        .&nbsp;Data o školách jsou od&nbsp;
        <ControlLink url=" https://portal.csicr.cz/Search/School">
          České školní inspekce
        </ControlLink>
        .
      </Typography>
    ),
  },
  {
    Icon: <PermMediaIcon color="secondary" />,
    title: 'Poděkování',
    description: (
      <Typography>
        Ikony a ilustrace jsou z open-source&nbsp;
        <ControlLink url="https://undraw.co/">UnDraw</ControlLink> a&nbsp;
        <ControlLink url="https://material-ui.com/">Material UI</ControlLink>.
      </Typography>
    ),
  },
]
