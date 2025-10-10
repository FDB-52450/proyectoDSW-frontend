import { useState } from 'react'

import { Drawer, Burger, Accordion, Button, Stack } from '@mantine/core';

import { SearchBar } from '../SearchBar/SearchBar.tsx';

import MotherboardIcon from '../../../../../assets/icons/motherboard.png'
import GraphicsCardIcon from '../../../../../assets/icons/graphicCard.png'
import ProcessorIcon from '../../../../../assets/icons/processor.png'
import RamMemoryIcon from '../../../../../assets/icons/ram.png'
import DiskMemoryIcon from '../../../../../assets/icons/hardDisk.png'
import PowerSupplyIcon from '../../../../../assets/icons/powerSupply.png'
import ComputerCaseIcon from '../../../../../assets/icons/computerTower.png'
import ComputerFanIcon from '../../../../../assets/icons/fan.png'

import MouseIcon from '../../../../../assets/icons/mouse.png'
import KeyboardIcon from '../../../../../assets/icons/keyboard.png'
import HeadphonesIcon from '../../../../../assets/icons/headphone.png'
import MicrophoneIcon from '../../../../../assets/icons/microphone.png'

import logo from '../../../../../assets/logoPagina.png'

export function BurgerMenu() {
    const [opened, setOpened] = useState(false);

    return (
        <>
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="md" color="white"/>
        
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title={<img src={logo} alt="motherboard" style={{ height: 60 }} />}
            padding="md"
            size="sm"
        >
            <SearchBar style={{ paddingBottom: 10}}></SearchBar>
            <Accordion>
                <Accordion.Item value="componentes">
                    <Accordion.Control>Componentes</Accordion.Control>
                    <Accordion.Panel>
                        <Stack align="flex-start" gap={0}>
                            <Button leftSection={<img src={MotherboardIcon} alt="motherboard" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=placas%20madre'>Motherboards</Button>
                            <Button leftSection={<img src={GraphicsCardIcon} alt="placasVideo" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=tarjetas%20graficas'>Placas de video</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=tarjetas%20graficas&marca=NVIDIA'>NVIDIA</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=tarjetas%20graficas&marca=AMD'>AMD</Button>
                            <Button leftSection={<img src={ProcessorIcon} alt="procesadores" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=procesadores'>Procesadores</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=procesadores&marca=INTEL'>INTEL</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=procesadores&marca=AMD'>AMD</Button>
                            <Button leftSection={<img src={RamMemoryIcon} alt="memoriasRAM" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=memoriasRAM'>Memorias RAM</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=memoriasRAM&nombre=DDR4'>DDR4</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=memoriasRAM&nombre=DDR5'>DDR5</Button>
                            <Button leftSection={<img src={DiskMemoryIcon} alt="almacenamiento" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=almacenamiento'>Almacenamiento</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=almacenamiento&nombre=SSD'>SSD</Button>
                                <Button variant="subtle" size="xs" left={40} component='a' href='/productos?categoria=almacenamiento&nombre=HDD'>HDD</Button>
                            <Button leftSection={<img src={PowerSupplyIcon} alt="fuentesPoder" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=fuentes%20de%20poder'>Fuentes de Poder</Button>
                            <Button leftSection={<img src={ComputerCaseIcon} alt="gabinetes" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=gabinetes'>Gabinetes</Button>
                            <Button leftSection={<img src={ComputerFanIcon} alt="refrigeracion" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=refrigeracion'>Refrigeracion</Button>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="perifericos">
                    <Accordion.Control>Perifericos</Accordion.Control>
                    <Accordion.Panel>
                        <Stack align="flex-start" gap={0}>
                            <Button leftSection={<img src={MouseIcon} alt="mouse" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=mouse'>Mouse</Button>
                            <Button leftSection={<img src={KeyboardIcon} alt="teclados" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=teclados'>Teclado</Button>
                            <Button leftSection={<img src={HeadphonesIcon} alt="auriculares" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=auriculares'>Auriculares</Button>
                            <Button leftSection={<img src={MicrophoneIcon} alt="microfonos" style={{ width: 25, height: 25 }} />} 
                            variant="subtle" size="sm" component='a' href='/productos?categoria=microfonos'>Microfonos</Button>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="monitores">
                    <Accordion.Control chevron={<></>} 
                    onClick={(event) => {
                        event.stopPropagation()
                        window.location.href = '/productos?categoria=monitores'
                    }}>Monitores</Accordion.Control>
                </Accordion.Item>

                <Accordion.Item value="notebooks">
                    <Accordion.Control chevron={<></>} 
                    onClick={(event) => {
                        event.stopPropagation()
                        window.location.href = '/productos?categoria=notebooks'
                    }}>Notebooks</Accordion.Control>
                </Accordion.Item>

                <Accordion.Item value="computadoras">
                    <Accordion.Control chevron={<></>} 
                    onClick={(event) => {
                        event.stopPropagation()
                        window.location.href = '/productos?categoria=computadoras'
                    }}>Computadoras</Accordion.Control>
                </Accordion.Item>
            </Accordion>
        </Drawer>
        </>
    );
}