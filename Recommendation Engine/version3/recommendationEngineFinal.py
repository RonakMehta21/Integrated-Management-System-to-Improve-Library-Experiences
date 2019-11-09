#recommendation engine
#item similarity based recommendation

#importing libs
import pandas as pd
import numpy as np

from scipy.sparse import csr_matrix

books = pd.read_csv('userRatings.csv')

#create a pivot table 
books_pivot = books.pivot(index='bookTitle',columns = 'userID', values = 'bookRating').fillna(0)
books_matrix = csr_matrix(books_pivot.values)

from sklearn.neighbors import NearestNeighbors

model_knn = NearestNeighbors(metric = 'cosine',algorithm = 'brute')
model_knn.fit(books_matrix)

# query_index = np.random.choice(books_pivot.shape[0])
query_index = 21

# print(query_index)
#print(query_index)
#to view pivor table
#books_pivot.iloc[query_index,:].values.reshape(1,-1)

distances, indices = model_knn.kneighbors(books_pivot.iloc[query_index,:].values.reshape(1,-1),n_neighbors=6)

#books_pivot.index[query_index]
#      'Hide &amp; Seek'

for i in range(0,len(distances.flatten())):
    if i==0:
        print('recommendations for {0}:\n'.format(books_pivot.index[query_index]))
    else:
        print('{0}:{1}:\n'.format(i,books_pivot.index[indices.flatten()[i]]))
        

    

















