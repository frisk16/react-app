import { Flex, LinkBox } from "@chakra-ui/react";
import { FC, memo } from "react";
import { PrevPageActiveButton } from "../atom/paginator/PrevPageActiveButton";
import { PrevPageButton } from "../atom/paginator/PrevPageButton";
import { PageLinkActiveButton } from "../atom/paginator/PageLinkActiveButton";
import { PageLinkButton } from "../atom/paginator/PageLinkButton";
import { NextPageActiveButton } from "../atom/paginator/NextPageActiveButton";
import { NextPageButton } from "../atom/paginator/NextPageButton";
import { Paginator } from "../../types/api/paginator";

type Props = {
    paginator: Paginator | null;
    keyword: string;
};

export const PageNavigator: FC<Props> = memo((props) => {
    const { paginator, keyword } = props;

    return (
        <Flex my={8} justifyContent="center" mx={4}>
            <LinkBox>
                {paginator?.current_page === 1 ? (
                    <PrevPageActiveButton>&laquo;</PrevPageActiveButton>
                ) : (
                    <PrevPageButton currentPageNumber={paginator?.current_page} keyword={keyword}>&laquo;</PrevPageButton>
                )}
            </LinkBox>
            <LinkBox>
                {[...Array(paginator?.last_page)].map((n, index) => (
                    paginator?.current_page === index + 1 ? (
                        <PageLinkActiveButton key={index}>{index + 1}</PageLinkActiveButton>
                    ) : (
                        <PageLinkButton key={index} pageNumber={index + 1} keyword={keyword}>{index + 1}</PageLinkButton>
                    )
                ))}                
            </LinkBox>
            <LinkBox>
                {paginator?.current_page === paginator?.last_page ? (
                    <NextPageActiveButton>&raquo;</NextPageActiveButton>
                ) : (
                    <NextPageButton currentPageNumber={paginator?.current_page} keyword={keyword}>&raquo;</NextPageButton>
                )}
            </LinkBox>
        </Flex>
    )
})