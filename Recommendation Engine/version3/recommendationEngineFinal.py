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

def recommend(q):
    query_index = q

    distances, indices = model_knn.kneighbors(books_pivot.iloc[query_index,:].values.reshape(1,-1),n_neighbors=6)

    l = []
    for i in range(0,len(distances.flatten())):
        if i != 0:
            # print('recommendations for {0}:\n'.format(books_pivot.index[query_index]))
        # else:
            # print('{0}:{1}:\n'.format(i,books_pivot.index[indices.flatten()[i]]))
            l.append(indices.flatten()[i])
    return print(l)

#pass number to this function
#**********
recommend(0)


        

    

















