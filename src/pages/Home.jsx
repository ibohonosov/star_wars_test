import CardList from "../components/CardList.jsx";
import {useEffect, useState} from "react";
import {getHeroes} from "../api/api.js";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";
import styles from './Home.module.css';

export default function Home() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const onChangeInput = debounce((event) => {
        setFilters(event.target.value);
    }, 500)
    const onPageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await getHeroes(filters, currentPage);
                setItems(data.results);
                setPageCount(Math.ceil(data.count / 10));
                console.log(data.results);
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