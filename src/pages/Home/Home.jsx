import CardList from "../../components/CardList/CardList.jsx";
import {useEffect, useState} from "react";
import {getHeroes} from "../../api/api.js";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";
import styles from './Home.module.css';

export default function Home() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    //Using the lodash.debounce library, I make a delay in calling the api for input search
    const onChangeInput = debounce((event) => {
        setFilters(event.target.value);
    }, 500)
    const onPageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    //Calling a getHeroes (API function) to display data cards when mounting a page and counting pages for ReactPaginate
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await getHeroes(filters, currentPage);
                setItems(data.results);
                if (data.count !== undefined && !isNaN(data.count)) {
                    setPageCount(Math.ceil(data.count / 10));
                } else {
                    console.warn("data.count is not a valid number:", data.count);
                }
            } catch (err) {
                console.log(err)
            }
        };

        fetchItems();
    }, [filters, currentPage]);

    return (
        <div className={styles.home}>
            <div className={styles.filter_block}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={onChangeInput}
                    className={styles.search}
                />
            </div>

            <CardList items={items}/>

            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageClick}
                containerClassName={styles.pagination}
                subContainerClassName={'pages pagination'}
                activeClassName={styles.active}
            />
        </div>
    )
}