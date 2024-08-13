import React from 'react';
import {
	SimpleGrid,
	Pagination,
	Select,
	TextInput,
	Center,
	Loader,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as Api from '../api';
import { ProductCard } from '../components/ProductCard';
import { debounce } from 'lodash';

export function HomePage() {
	const [searchValue, setSearchValue] = React.useState('');
	const [sortBy, setSortBy] = React.useState('title');
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [items, setItems] = React.useState([]);
	const [isLoading, setLoading] = React.useState(false);
	const [isReady, setReady] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');

	const debouncedSearch = React.useMemo(
		() =>
			debounce((value) => {
				setSearchValue(value);
			}, 350),
		[]
	);

	function handleInputChange(value) {
		setInputValue(value);
		debouncedSearch(value);
	}

	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	React.useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);
				const selectedFields = [
					'id',
					'title',
					'price',
					'imageUrl',
					'rating',
				].join(',');
				const limit = 6;

				const response = await Api.getPizzas({
					limit,
					sortBy,
					page: currentPage,
					_select: selectedFields,
					...(searchValue && { title: searchValue + '*' }),
				});

				setItems(response.items);
				setTotalPages(response.meta.total_pages);
			} catch (error) {
				console.error(error);
				setItems([]);
				setTotalPages(1);
			} finally {
				setLoading(false);
			}
		};

		fetchItems().finally(() => {
			setReady(true);
		});
	}, [searchValue, sortBy, currentPage]);

	function handleSortOrderChange(value) {
		setSortBy(value);
		setCurrentPage(1);
	}

	function handlePageChange(page) {
		setCurrentPage(page);
	}

	if (!isReady) {
		return (
			<Center style={{ marginTop: 50 }}>
				<Loader />
			</Center>
		);
	}

	return (
		<>
			<div
				style={{
					display: 'grid',
					marginTop: 20,
					gridTemplateColumns: isSmallScreen ? '1fr' : '1fr 0.4fr',
					gap: 20,
				}}>
				<TextInput
					placeholder="Найти продукт..."
					label="Поиск"
					style={{ flex: 1 }}
					value={inputValue}
					onChange={(e) => handleInputChange(e.currentTarget.value)}
					rightSection={isLoading && <Loader size="xs" />}
					size="lg"
				/>

				<Select
					label="Сортировка"
					placeholder="Pick one"
					size="lg"
					value={sortBy}
					onChange={handleSortOrderChange}
					data={[
						{ value: '-title', label: 'По заголовку (Убывание)' },
						{ value: 'title', label: 'По заголовку (Возрастание)' },
						{ value: '-price', label: 'По цене (Убывание)' },
						{ value: 'price', label: 'По цене (Возрастание)' },
						{ value: '-rating', label: 'По рейтингу (Убывание)' },
						{ value: 'rating', label: 'По рейтингу (Возрастание)' },
					]}
				/>
			</div>

			<br />
			<Pagination
				value={currentPage}
				onChange={handlePageChange}
				total={totalPages}
			/>
			<br />

			{isLoading && (
				<Center style={{ marginTop: 50 }}>
					<Loader />
				</Center>
			)}

			{!isLoading && (
				<div>
					<SimpleGrid cols={isSmallScreen ? 1 : 3}>
						{items.map((item) => (
							<ProductCard
								key={item.id}
								imageUrl={item.imageUrl}
								title={item.title}
								price={item.price}
								rating={item.rating}
								id={item.id}
							/>
						))}
					</SimpleGrid>
				</div>
			)}
		</>
	);
}
