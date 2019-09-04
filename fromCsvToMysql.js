require('dotenv').config();
require('module-alias/register');
const fs = require('fs');
const csv = require('fast-csv');
const _ = require('lodash');

const config = require('config');
const db = require('db/connect');
const utils = require('db/utils')(db);
config.db = {
	connect: db,
	utils,
};

const authorAction = require('action/author');
const imageAction = require('action/image');
const bookAction = require('action/book');

const fileStream = fs.createReadStream('books.csv');

const parser = csv.parse();
const requiredFields = [
	'book_id',
	'goodreads_book_id',
	'best_book_id',
	'work_id',
	'books_count',
	'isbn',
	'isbn13',
	'authors',
	'original_publication_year',
	'original_title',
	'title',
	'language_code',
	'average_rating',
	'ratings_count',
	'work_ratings_count',
	'work_text_reviews_count',
	'ratings_1',
	'ratings_2',
	'ratings_3',
	'ratings_4',
	'ratings_5',
	'image_url',
	'small_image_url'
];
let firstRow = true;

fileStream
	.pipe(parser)
	.on('error', err => console.log(`\t=== Error in stream\t===\n${err}`))
	.on('readable', async () => {
		for (let row = parser.read(); row; row = parser.read()) {
			if (firstRow) {
				firstRow = false;
				if (!_.isEqual(requiredFields, row)) {
					throw 'CSV file not valid!';
				}
			}
			else {
				try {
					const authorName = row[7];
					const title = row[9];
					const description = row[10];
					const imageLink = row[22];

					const existImage = await imageAction.getByLink(imageLink);
					const existAuthor = await authorAction.getByName(authorName);

					let image, author;

					if (_.has(existImage[0], 'id')) {
						image = existImage[0].id;
					} else {
						const newImage = await imageAction.addImage({ link: imageLink });
						image = newImage.id;
					}
					if (_.has(existAuthor[0], 'id')) {
						author = existAuthor[0].id;
					} else {
						const newAuthor = await authorAction.addAuthor({ name: authorName });
						author = newAuthor.id;
					}

					bookAction.getBook({filter: title}).then(res => {
						if (res.length === 0) {
							bookAction.addBook({
								title,
								description,
								author,
								image,
							}).then(() => console.log(`Added book (${title})`))
						} else {
							console.log(`This book (${title}) already exist`);
						}
					});

				} catch (err) {
					console.log('=== error when load from csv ===\n', err);
				}
			}
		}
	})
	.on('end', count => {
		console.log(`Was read ${count} rows`);
		process.exit(0);
	});
