import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { NavLinkActiveButton } from "../components/atom/header/NavLinkActiveButton";
import { NavLinkButton } from "../components/atom/header/NavLinkButton";

type Props = {
    children: ReactNode;
    tagId?: string;
};

export const DefaultLayout: FC<Props> = ((props) => {
    const { children, tagId = null } = props;
    let pathName = new URL(window.location.href).pathname;
    
    return (
        <>
            <header>
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bg="white"
                    h={16}
                    px={{ base: 4, lg: 8 }}
                    zIndex={10}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size={{ base: "sm", lg: "md" }} as="a" href="/">React App</Heading>
                        <Box>
                            
                            {/* Tasks Link */}
                            {pathName === "/" || pathName === `/tags/${tagId}` ? (
                                <NavLinkActiveButton>Tasks</NavLinkActiveButton>
                            ) : (
                                <NavLinkButton href="/">Tasks</NavLinkButton>
                            )}

                            {/* Tag Setting */}
                            {
                                pathName === "/tags" ? (
                                    <NavLinkActiveButton>Tag Setting</NavLinkActiveButton>
                                ) : (
                                    <NavLinkButton href="/tags">Tag Setting</NavLinkButton>
                                )
                            }

                        </Box>
                    </Flex>
                </Box>
            </header>

            <main style={{ marginTop: "72px" }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
})