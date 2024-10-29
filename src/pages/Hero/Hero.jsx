import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import { getFilms, getStarShips } from "../../api/api.js";
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import CustomEdge from '../../components/CustomEdge.jsx';
import styles from './HeroGraph.module.css'
import '@xyflow/react/dist/style.css';

import '@xyflow/react/dist/style.css';

export default function Hero() {

    const location = useLocation()
    const {item} = location.state || {};
    const styleNodes =  {
            border: '1px solid #222',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#000',
            color: '#FFDE06',
            fontSize: '14px',
    }

    const initialNodes = [];
    const initialEdges = [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges ,onEdgesChange] = useEdgesState(initialEdges);

    // Using a hook to get information from the API about the films and ships of the hero whose id we passed above,
    // as well as drawing a graph using the ReactFlow library, when mounting the component
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data: films } = await getFilms(item.id)
                const { data: starships } = await getStarShips(item.id)

                // The first node from which the chart is built
                const heroNodes = {
                    id: `${item.id}`,
                    position: { x: (window.screen.width - 250) / 2, y: 20 },
                    data: {label: item.name},
                    style: styleNodes
                };

                //nodes for films
                const filmsNodes = films.results.map((film, index) => ({
                    id: `${film.id}`,
                    position: {
                        x: Math.random() + index * 200,
                        y: Math.random() + 200,
                    },
                    data: {label: `${film.title}`},
                    style: styleNodes,
                }));

                // nodes for star-ships
                const starShipsNodes = starships.results.map((starship, index) => ({
                    id: `${starship.id}`,
                    position: {
                        x: Math.random() + index * 200,
                        y: Math.random() + 400,
                    },
                    data: {label: `${starship.name}`},
                    style: styleNodes
                }))
                // edges from heroNodes to filmsNodes
                const filmEdges = films.results.map(film => ({
                   id: `e${item.id}-${film.id}`,
                   source: `${item.id}`,
                   target: `${film.id}`,
                   data: { label: 'Film', content: '#1E90FF' },
                   type: 'custom',
                }))
                const starShipsEdges = [];
                // building edges between films and starships in a graphical structure
                films.results.forEach(film => {
                    starships.results.forEach(starship => {
                       if (starship.films.includes(film.id)) {
                           starShipsEdges.push({
                               id: `e${starship.id}-${film.id}`,
                               source: `${film.id}`,
                               target: `${starship.id}`,
                               data: { label: 'StarShip', color: '#00FF00' },
                               type: 'custom',
                           })
                       }
                    })
                })

                setNodes([heroNodes, ...filmsNodes, ...starShipsNodes]);
                setEdges([...filmEdges, ...starShipsEdges]);
            } catch (err) {
                console.log(err)
            }
        };
        fetchItems();
    }, [item.id]);

    return (
        <div className="hero">

            <Link to={'/'}>
                <svg
                className={styles.btn_back}
                width="32"
                height="28"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M1 7H14.7143"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.71436 1L14.7144 7L8.71436 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
        </Link>

    <div className={styles.graph}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            edgeTypes={{ custom: CustomEdge }}
        >
        </ReactFlow>/
    </div>
    </div>
    )
}
