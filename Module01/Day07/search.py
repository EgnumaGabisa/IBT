
# def linear_search(arr, target):
#     for index in  range(len(arr)):
#         if arr[index ] == target:
#             return index
#         return -1
# arr=[1,2,3,4,5]
# print(linear_search(arr,2))






# def binary_search(arr,target):
#     low=0
#     high=len(arr) -1
#     while low <= high:
#         mid=(low+high)//2
#         if arr[mid]==target:
#          return mid
#         elif arr[mid]>target:
#           low=mid+1
#         else:
#             high=mid-1
#     return-1          
# arr=[1,2,3,4,5]
# print(binary_search(arr,2))


data=[ 50 , 20 , 80 , 10 , 40]

data.sort(reverse=True)
print(data)

    
