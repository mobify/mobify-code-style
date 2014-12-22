Almost all of our Java is written for android, so we're using the [android platform development](https://github.com/android/platform_development) android studio config. You can also read more about the java style guide for android contributors [here](http://source.android.com/source/code-style.html)

You can import the provided AndroidStyle.xml file into Android Studio by:

    1. Copy the AndroidStyle.xml file into ~/Library/Preferences/AndroidStudio/codestyles/
    2. Restart Android Studio
    3. Open Android Studio > preferences
    4. Click the Code Style drop down and select Java
    5. Choose the AndroidStyle option under the scheme drop down at the top.
    6. Click apply, and OK


# Rules

## Comments

Use Javadoc comments for **classes**, and **nontrivial public** methods.

## Member Variables
Do **not** prefix member variables with 'm'. Member variables should be declared at the top of the class if they are used often, otherwise they should be declared right before they are used.

