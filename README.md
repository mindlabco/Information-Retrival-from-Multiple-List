# Information Retrival from Multiple List
# Description
It is a custom web part developed in SharePoint Framework (SPFx). We have used bootstrap module. We used this web part to get the values from multiple lists like *Addition Information, LPTiles, Categories and TileType*. From various lists we get the values nad display it in the web part.

This web part gets the value based on the id passed in the URL. Based on the id's value, we retrieve the value from the LPTiles list. LPTiles list is a custom consist of various columns including two look up columns i.e. *TileType and Categories*.

This web part also creates a dynamic column in *Additional Information* list based on the values found in *LPTiles* list.

# How to use
To use the web part follow the below steps:-
1) Clone or Download the web part solution
2) Install all the list STPs (which is available inside the repository) in your site (Keep the name same as it is, do not change the name of the list)
3) Go to *LPTiles* list and create new two lookup columns named *Tile Type* and *Category*. Configurations are shown in the screen shot for both the columns.
4) Navigate to the cloned repository folder
5) Open your system's terminal on that folder
6) Now run *npm install* command to install all the npm packages

# Column Configuration

1) Below is the screen shot for *Tile Type* column

![Image of Yaktocat](https://github.com/mindlabco/Information-Retrival-from-Multiple-List/blob/master/Tile-Type-Config.png)

2) Below is the screen shot for *Category* column

![Image of Yaktocat](https://github.com/mindlabco/Information-Retrival-from-Multiple-List/blob/master/Category-config.png)

# Output

Below Screenshot is the output of this web part

![Image of Yaktocat](https://github.com/mindlabco/Information-Retrival-from-Multiple-List/blob/master/Information-Retrival.png)
