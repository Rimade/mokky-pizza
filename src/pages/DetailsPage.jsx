import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	Container,
	Grid,
	Image,
	Rating,
	Col,
	Text,
	Badge,
	Button,
	Center,
	Loader,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as Api from '../api';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export function DetailsPage() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [pizza, setPizza] = useState(null);
	const [selectedSize, setSelectedSize] = useState(0);

	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const response = await Api.getOnePizza(id);
				setPizza(response);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchPizza();
	}, [id]);

	const handleSizeSelect = (size) => {
		setSelectedSize(size);
	};

	if (loading) {
		return (
			<Center style={{ marginTop: 50 }}>
				<Loader />
			</Center>
		);
	}

	return (
		<Container size="md" style={{ marginTop: '2rem' }}>
			<Grid gutter="md" direction={isSmallScreen ? 'column' : 'row'}>
				<Col span={isSmallScreen ? 12 : 6}>
					<Image src={pizza.imageUrl} alt={pizza.title} fit="cover" />
				</Col>
				<Col span={isSmallScreen ? 12 : 6}>
					<Link to="/">
						<Button variant="outline" color="gray">
							{`< Назад`}
						</Button>
					</Link>
					<br />
					<br />
					<Text
						variant="h1"
						weight={700}
						style={{ marginBottom: '1rem', fontSize: 28 }}>
						{pizza.title}
					</Text>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 10,
						}}>
						<Badge color="pink" variant="light" size="lg">
							{pizza.price} ₽
						</Badge>
						<Rating size="md" defaultValue={pizza.rating} />
						<Badge
							variant="outline"
							color="teal"
							size="lg"
							style={{ marginBottom: '0.5rem' }}>
							{categories[pizza.category]}
						</Badge>
					</div>
					<Text style={{ marginBottom: '1rem' }}>{pizza.description}</Text>
					<div>
						{pizza.sizes.map((size) => (
							<Button
								key={size}
								variant={selectedSize === size ? 'filled' : 'outline'}
								color="blue"
								onClick={() => handleSizeSelect(size)}
								style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}>
								{size} см
							</Button>
						))}
					</div>
				</Col>
			</Grid>
		</Container>
	);
}
