import { Box, Image, Tooltip } from "@mantine/core"

import whatsappLogo from '../../../../assets/whatsappLogo.webp'

export function WhatsappButton() {
    return (
        <Box style={{ position: 'fixed', bottom: 20, right: 20,  zIndex: 1000}}>
            <a href='https://api.whatsapp.com/send/?phone=54943246316492&text&type=phone_number&app_absent=0'>
                <Tooltip label='Chatear por whatsapp' withArrow position='left'>
                    <Image src={whatsappLogo} w={75} h={75}/>
                </Tooltip>
            </a>
        </Box>
    )
}