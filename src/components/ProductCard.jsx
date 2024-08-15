import { Link } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Rating } from '@mantine/core';

export function ProductCard({ id, title, price, imageUrl, rating }) {
	return (
		<Card
			shadow="sm"
			padding="md"
			radius="md"
			withBorder
			style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
			<Image
				src={imageUrl}
				style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
					position: 'relative',
					marginLeft: '6px',
					zIndex: 0,
				}}
				alt={title}
			/>

			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%',
					background: 'rgba(255, 255, 255, 0.6)',
					padding: '5px',
					paddingTop: '1px',
					zIndex: 1,
					textAlign: 'center',
					backdropFilter: 'blur(2px)',
				}}>
				<Text
					weight={700}
					size="lg"
					style={{ textAlign: 'center', color: '#000', marginBottom: '4px' }}>
					{title}
				</Text>

				<Group
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						marginBottom: '8px',
					}}>
					<Badge color="pink" variant="light" size="lg">
						{price} ₽
					</Badge>
					<Rating defaultValue={rating} />
				</Group>

				<Link to={`/pizza/${id}`} style={{ textDecoration: 'none', zIndex: 3 }}>
					<Button variant="light" color="blue" fullWidth radius="md">
						Подробнее
					</Button>
				</Link>
			</div>
		</Card>
	);
}
