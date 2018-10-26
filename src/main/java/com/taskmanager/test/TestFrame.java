package com.taskmanager.test;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Created by Administrator on 2018/10/9.
 */
public class TestFrame extends JFrame {
    public static void main(String[] args) throws IOException {
        TestFrame frame=new TestFrame();
        frame.setTitle("Hello world");
        frame.setSize(new Dimension(1000,800));
        JLabel label=new JLabel(new ImageIcon("E:\\影视\\DCIM\\100MEDIA\\DJI_0015.JPG"));
        JScrollPane pane=new JScrollPane();
        JViewport jViewport = new JViewport();
        jViewport.setView(label);
        pane.setViewport(jViewport);
        frame.add(pane);
        frame.show();


    }
}
