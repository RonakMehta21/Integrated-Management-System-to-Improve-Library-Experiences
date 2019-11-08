#recommendation engine
#item similarity based recommendation

#importing libs
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import warnings
warnings.simplefilter('ignore')

books = pd.read_csv('BookDataset/Books.csv',sep=';',error_bad_lines=False,encoding='latin-1')

#books.columns
#Index(['ISBN', 'Book-Title', 'Book-Author', 'Year-Of-Publication', 'Publisher',
#       'Image-URL-S', 'Image-URL-M', 'Image-URL-L'],
#      dtype='object')
books.columns = ['ISBN', 'bookTitle', 'bookAuthor', 'yearOfPublication', 'publisher', 'imageUrlS', 'imageUrlM', 'imageUrlL']
# books.shape
# (271360, 8)

users = pd.read_csv('BookDataset/Users.csv',sep=';',error_bad_lines=False,encoding='latin-1')

#users.columns
#Index(['User-ID', 'Location', 'Age'], dtype='object')
users.columns = ['userID', 'Location', 'Age']
# users.shape
# (278858, 3)

ratings = pd.read_csv('BookDataset/BookRatings.csv',sep=';',error_bad_lines=False,encoding='latin-1')

#ratings.columns
#Index(['User-ID', 'ISBN', 'Book-Rating'], dtype='object')
ratings.columns = ['userID', 'ISBN', 'bookRating']
# ratings.shape
# (1149780, 3)

#to show ratings distribution
#plt.rc("font",size=20)
#ratings.bookRating.value_counts(sort=False).plot(kind='Bar')
#plt.title("Rating Distribution\n")
#plt.xlabel('ratings')
#plt.ylabel('count')
#plt.show()


#to show age distribution
#users.Age.hist(bins=[0,10,20,30.40,50,60,70,80,90,100])
#plt.title("Age distribution")
#plt.xlabel('age')
#plt.ylabel('count')
#plt.show()

# we are eliminating users with less than 100 ratings and books with less than 100 ratings

counts1 = ratings['userID'].value_counts()
ratings = ratings[ratings['userID'].isin(counts1[counts1 >= 200].index)]

counts2 = ratings['bookRating'].value_counts()
ratings = ratings[ratings['bookRating'].isin(counts2[counts2 >= 100].index)]

#collaborative filtering using KNN
#combining two datasets "ratings and books on the basis of ISBN"
combine_book_rating = pd.merge(ratings,books,on='ISBN')

#removing unwanted columns
columns = ['yearOfPublication','bookAuthor', 'publisher', 'imageUrlS', 'imageUrlM', 'imageUrlL']

combine_book_rating = combine_book_rating.drop(columns,axis=1)

#group by book titles and create a new column for total rating count.
#remove rows where booktitle is NaN
combine_book_rating = combine_book_rating.dropna(axis=0,subset=['bookTitle'])

#book rating count 
book_ratingCount = (combine_book_rating.groupby(by = ["bookTitle"])['bookRating'].count().reset_index().rename(columns={'bookRating':'totalRatingCount'})[['bookTitle','totalRatingCount']])


#combining combine_book_rating with book_ratingCount
rating_with_totalRatingCount = combine_book_rating.merge(book_ratingCount,left_on='bookTitle',right_on='bookTitle',how='left')
#rating_with_totalRatingCount.columns
#Out[136]: Index(['userID', 'ISBN', 'bookRating', 'bookTitle', 'totalRatingCount'], dtype='object')


#setting the float numbers to display last 3 decimals
pd.set_option('display.float_format',lambda x: '%.3f' % x)

#book_ratingCount['totalRatingCount'].describe()
#
#count   160576.000
#mean    3.044     
#std     7.428     
#min     1.000     
#25%     1.000     
#50%     1.000     
#75%     2.000     
#max     365.000   
#Name: totalRatingCount, dtype: float64

popularity_threshold = 50
rating_popular_book = rating_with_totalRatingCount.query('totalRatingCount >= @popularity_threshold')
# columns : (['userID', 'ISBN', 'bookRating', 'bookTitle', 'totalRatingCount'], dtype='object')

#rating_popular_book.shape
# (62149, 5)

#combining rating_popular_book with user dataset
#filtering into us and canada users as these contain most information and also reduces complexity
combined = rating_popular_book.merge(users,left_on = 'userID',right_on = 'userID',how='left')
#combined.shape
# (62149, 7)

us_canada_user_rating = combined[combined['Location'].str.contains('usa|canada')]
us_canada_user_rating = us_canada_user_rating.drop('Age',axis=1)
#us_canada_user_rating.shape
# (56396, 6)






#us_canada_user_rating.columns
#Index(['userID', 'ISBN', 'bookRating', 'bookTitle', 'totalRatingCount','Location'],
#      dtype='object')

#implementing knn 
from scipy.sparse import csr_matrix
#dropping duplicates where same user has given multiple ratings for same book 
us_canada_user_rating = us_canada_user_rating.drop_duplicates(['userID','bookTitle'])

#us_canada_user_rating.shape
# (54731, 6)

#create a pivot table 
us_canada_user_rating_pivot = us_canada_user_rating.pivot(index='bookTitle',columns = 'userID', values = 'bookRating').fillna(0)
us_canada_user_rating_matrix = csr_matrix(us_canada_user_rating_pivot.values)

from sklearn.neighbors import NearestNeighbors

model_knn = NearestNeighbors(metric = 'cosine',algorithm = 'brute')
model_knn.fit(us_canada_user_rating_matrix)

query_index = np.random.choice(us_canada_user_rating_pivot.shape[0])

#print(query_index)
#to view pivor table
#us_canada_user_rating_pivot.iloc[query_index,:].values.reshape(1,-1)

distances, indices = model_knn.kneighbors(us_canada_user_rating_pivot.iloc[query_index,:].values.reshape(1,-1),n_neighbors=6)

#us_canada_user_rating_pivot.index[query_index]
#      'Hide &amp; Seek'

for i in range(0,len(distances.flatten())):
    if i==0:
        print('recommendations for {0}:\n'.format(us_canada_user_rating_pivot.index[query_index]))
    else:
        print('{0}:{1}:\n'.format(i,us_canada_user_rating_pivot.index[indices.flatten()[i]]))
        

    

















